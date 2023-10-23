using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ToDoListDbContext _context;

        public TasksController(ToDoListDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Models.Task>>> GetUserTasks(int userId)
        {
            if (_context.Tasks == null)
            {
                return NotFound();
            }

            List<Models.Task> tasks = await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();

            return tasks;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Models.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<int>> PostTask([FromBody] TaskDto taskDto)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity set 'ToDoListDbContext.Tasks'  is null.");
            }

            Models.Task task = new()
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                DueDate = DateOnly.Parse(taskDto.DueDate),
                UserId = taskDto.UserId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            var newTask = await _context.Tasks.FirstOrDefaultAsync(t => t.Title == task.Title && t.UserId == task.UserId);

            if (newTask != null)
            {
                return Ok(newTask.Id);
            }
            else return NotFound();
        }

        [HttpPatch("toggle-completion/{taskId}")]
        public async Task<ActionResult<int>> ToggleTaskCompletion(int taskId)
        {
            Models.Task? task = await _context.Tasks.FindAsync(taskId);

            if (task == null) return NotFound();

            task.IsCompleted = !task.IsCompleted;
            await _context.SaveChangesAsync();

            return Ok(taskId);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (_context.Tasks == null)
            {
                return NotFound();
            }
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
