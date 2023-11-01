using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Tests.ControllersTests
{
    [TestFixture]
    public class UsersControllerTests
    {
        private DbContextOptions<ToDoListDbContext> _options;

        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<ToDoListDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new ToDoListDbContext(_options);
            context.Users.Add(new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", PasswordHash = "G07LUpKyUDZrjPG3r9ySOBc115PSuiA+RkfUVx3XwhA=:NpJiwD0pmfXfPK5PBN9RKA==:10000:SHA256" });
            context.SaveChanges();
        }

        [Test]
        public async System.Threading.Tasks.Task CheckIfEmailExists_ReturnsTrueIfExists()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);

            // Act
            var result = await controller.CheckIfEmailExists("john.doe@example.com");

            // Assert
            Assert.That(result.Value, Is.True);
        }

        [Test]
        public async System.Threading.Tasks.Task CheckIfEmailExists_ReturnsFalseIfNotExists()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);

            // Act
            var result = await controller.CheckIfEmailExists("nonexistent@example.com");

            // Assert
            Assert.That(result.Value, Is.False);
        }

        [Test]
        public async System.Threading.Tasks.Task GetFullName_ReturnsFullNameIfExists()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);

            // Act
            var result = await controller.GetFullName(1);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = (OkObjectResult)result.Result;

            Assert.That(okResult.Value, Is.Not.Null);
            Assert.That(okResult.Value, Is.InstanceOf<object>());

            var fullName = okResult.Value.GetType().GetProperty("fullName")?.GetValue(okResult.Value);
            Assert.That(fullName, Is.InstanceOf<string>());
            Assert.That(fullName, Is.EqualTo("John Doe"));
        }

        [Test]
        public async System.Threading.Tasks.Task GetFullName_ReturnsNotFoundIfUserNotExists()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);

            // Act
            var result = await controller.GetFullName(999);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async System.Threading.Tasks.Task TryToLogin_ReturnsOkIfValidCredentials()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);

            var loginDto = new LoginDto
            {
                Email = "john.doe@example.com",
                Password = "hashedPassword"
            };

            // Act
            var result = await controller.TryToLogin(loginDto);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async System.Threading.Tasks.Task TryToLogin_ReturnsUnauthorizedIfInvalidCredentials()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);

            var loginDto = new LoginDto
            {
                Email = "john.doe@example.com",
                Password = "wrongPassword"
            };

            // Act
            var result = await controller.TryToLogin(loginDto);

            // Assert
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        [Test]
        public async System.Threading.Tasks.Task PostUser_RegistersNewUser()
        {
            // Arrange
            using var context = new ToDoListDbContext(_options);
            var controller = new UsersController(context);
            var newUserDto = new NewUserDto
            {
                FirstName = "New",
                LastName = "User",
                Email = "new.user@example.com",
                Password = "newPassword"
            };

            // Act
            var result = await controller.PostUser(newUserDto);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = (OkObjectResult)result;

            Assert.That(okResult.Value, Is.Not.Null);
            Assert.That(okResult.Value, Is.InstanceOf<object>());

            var message = okResult.Value.GetType().GetProperty("message")?.GetValue(okResult.Value);
            Assert.That(message, Is.InstanceOf<string>());
            Assert.That(message, Is.EqualTo("User registred successfully"));

            var newUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "new.user@example.com");
            Assert.That(newUser, Is.Not.Null);
            Assert.That(newUser.FirstName, Is.EqualTo("New"));
            Assert.That(newUser.LastName, Is.EqualTo("User"));
        }
    }
}
