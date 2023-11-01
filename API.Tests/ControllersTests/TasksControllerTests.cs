using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework.Internal;


namespace API.Tests.ControllersTests
{
    [TestFixture]
    public class TasksControllerTests
    {
        private DbContextOptions<ToDoListDbContext> _options;

        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<ToDoListDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new ToDoListDbContext(_options);


            context.Users.AddRange(
                new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", PasswordHash = "password" },
                new User { FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", PasswordHash = "password" }
             );

            context.Tasks.AddRange(
                new Models.Task { Title = "Task One", Description = "Description One", UserId = 2, DueDate = DateOnly.Parse(DateTime.Now.AddDays(1).ToString("d")) },
                new Models.Task { Title = "Task Two", Description = "Description Two", UserId = 2, DueDate = DateOnly.Parse(DateTime.Now.AddDays(2).ToString("d")) },
                new Models.Task { Title = "Task Three", Description = "Description Three", UserId = 1, DueDate = DateOnly.Parse(DateTime.Now.AddDays(3).ToString("d")) }
            );

            context.SaveChanges();
        }

        [Test]
        public void GetUserTasks_ReturnsCorrectResult()
        {
            // Arange
            using var context = new ToDoListDbContext(_options);
            var controller = new TasksController(context);

            // Act
            ActionResult<List<Models.Task>>? result = controller.GetUserTasks(2).Result;

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());

            var okResult = (OkObjectResult)result.Result;
            Assert.That(okResult!.StatusCode, Is.EqualTo(200));

            var tasks = okResult.Value as List<Models.Task>;
            Assert.That(tasks, Has.Count.EqualTo(2));
        }

        [Test]
        public async System.Threading.Tasks.Task GetUserTasks_ReturnsNotFoundWhenUserIdDoesNotExist()
        {
            // Arange
            using var context = new ToDoListDbContext(_options);
            var controller = new TasksController(context);

            // Act
            var result = await controller.GetUserTasks(999);

            // Asser
            Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async System.Threading.Tasks.Task PutTask_UpdatesTaskInDatabase()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new TasksController(context);

            int taskId = 1;
            var updatedTaskDto = new TaskDto
            {
                Title = "Updated Task Title",
                Description = "Updated Task Description",
                DueDate = DateTime.Now.AddDays(7).ToString("d")
            };

            // Act
            var result = await controller.PutTask(taskId, updatedTaskDto);

            // Assert
            Assert.That(result, Is.InstanceOf<OkResult>());

            // Verify task is updated in the database
            Models.Task updatedTask = await context.Tasks.FindAsync(taskId);
            Assert.That(updatedTask, Is.Not.Null);
            Assert.Multiple(() =>
            {
                Assert.That(updatedTask.Title, Is.EqualTo(updatedTaskDto.Title));
                Assert.That(updatedTask.Description, Is.EqualTo(updatedTaskDto.Description));
                Assert.That(updatedTask.DueDate, Is.EqualTo(DateOnly.Parse(updatedTaskDto.DueDate)));
            });
        }

        [Test]
        public async System.Threading.Tasks.Task PostTask_AddsNewTask()
        {
            // Arange
            using var context = new ToDoListDbContext(_options);
            var controller = new TasksController(context);

            var taskDto = new TaskDto
            {
                Title = "New Task",
                Description = "New Task Description",
                DueDate = DateTime.Now.AddDays(4).ToString("d"),
                UserId = 1
            };

            // Act
            var result = await controller.PostTask(taskDto);

            // Assert
            Assert.That(result, Is.InstanceOf<ActionResult<int>>());
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>()); // Expecting OkObjectResult here

            var okResult = (OkObjectResult)result.Result;
            Assert.That(okResult!.StatusCode, Is.EqualTo(200));

            var createdTaskId = (int)okResult.Value!;
            var createdTask = await context.Tasks.FindAsync(createdTaskId);

            Assert.That(createdTask, Is.Not.Null);
            Assert.Multiple(() =>
            {
                Assert.That(createdTask.Title, Is.EqualTo(taskDto.Title));
                Assert.That(createdTask.Description, Is.EqualTo(taskDto.Description));
                Assert.That(createdTask.UserId, Is.EqualTo(taskDto.UserId));
            });
        }

        [Test]
        public async System.Threading.Tasks.Task ToggleTaskCompletion_TogglesTaskCompletionStatus()
        {
            // Arange
            using var context = new ToDoListDbContext(_options);
            var controller = new TasksController(context);

            int taskId = 1;
            Models.Task initialTask = await context.Tasks.FindAsync(taskId);
            var initialCompletionStatus = initialTask!.IsCompleted;

            // Act
            var result = await controller.ToggleTaskCompletion(taskId);

            // Aser
            Assert.That(result, Is.InstanceOf<ActionResult<int>>());
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());

            Models.Task? updatedTask = await context.Tasks.FindAsync(taskId);
            Assert.That(updatedTask, Is.Not.Null);
            Assert.That(updatedTask.IsCompleted, Is.EqualTo(!initialCompletionStatus));
        }

        [Test]
        public async System.Threading.Tasks.Task DeleteTask_RemovesTaskFromDatabase()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new TasksController(context);

            int taskId = 1;

            // Act
            var result = await controller.DeleteTask(taskId);

            // Assert
            Assert.That(result, Is.InstanceOf<OkResult>());

            // Verify task is removed from the database
            Models.Task deletedTask = await context.Tasks.FindAsync(taskId);
            Assert.That(deletedTask, Is.Null);
        }
    }
}