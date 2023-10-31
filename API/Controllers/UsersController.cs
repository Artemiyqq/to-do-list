using API.Data;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ToDoListDbContext _context;

        public UsersController(ToDoListDbContext context)
        {
            _context = context;
        }

        [HttpGet("check-email")]
        public async Task<ActionResult<bool>> CheckIfEmailExists([FromQuery] string email)
        {
            if (_context.Users == null)
            {
                return false;
            }

            bool userWithEmail = await _context.Users.AnyAsync(u => u.Email == email);

            return userWithEmail;
        }

        [HttpGet("get-full-name")]
        public async Task<ActionResult<string>> GetFullName([FromQuery] int userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            return user == null ? (ActionResult<string>)NotFound() : (ActionResult<string>)Ok(new { fullName = $"{user.FirstName} {user.LastName}" });
        }


        [HttpPost("try-to-login")]
        public Task<IActionResult> TryToLogin([FromBody] LoginDto loginDto)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == loginDto.Email);
            if (user != null)
            {
                if (PasswordService.Verify(loginDto.Password, user.PasswordHash))
                {
                    return System.Threading.Tasks.Task.FromResult<IActionResult>(Ok(new { userId = user.Id }));
                }
            }
            return System.Threading.Tasks.Task.FromResult<IActionResult>(Unauthorized(new { message = "Invalid credentials" }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> PostUser([FromBody] NewUserDto newUserDto)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'ToDoListDbContext.Users'  is null.");
            }


            User newUser = new()
            {
                FirstName = newUserDto.FirstName,
                LastName = newUserDto.LastName,
                Email = newUserDto.Email,
                PasswordHash = PasswordService.Hash(newUserDto.Password)
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registred successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
