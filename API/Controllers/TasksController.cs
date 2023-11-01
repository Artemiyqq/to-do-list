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

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Models.Task>>> GetUserTasks(int userId)
        {
            bool userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return NotFound();
            }

            List<Models.Task> tasks = await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
            return Ok(tasks);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskDto taskDto)
        {
            Models.Task? task = await _context.Tasks.FindAsync(id);

            if (task == null) return NotFound();

            if (task.Title != taskDto.Title) task.Title = taskDto.Title;
            if (task.Description != taskDto.Description) task.Description = taskDto.Description;

            DateOnly newDate = DateOnly.Parse(taskDto.DueDate);

            if (task.DueDate.ToString() != newDate.ToString()) task.DueDate = newDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

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

            return Ok();
        }
    }
}
