namespace API.Tests.ModelsTests
{
    [TestFixture]
    public class UserTaskRelationshipTests
    {
        [Test]
        public void User_AddingSeveralTasks_TasksArePresentInUserObject()
        {
            User user = new()
            {
                Id = 1,
                FirstName = "Ivan",
                LastName = "Ivanenko",
                Email = "ivan.ivanenko@example.com",
                PasswordHash = "passssworrd"
            };

            Models.Task firstTask = new()
            {
                Id = 1,
                Title = "First task",
                Description = "Description of the first task",
                IsCompleted = false,
                DueDate = DateTime.Today.AddDays(1),
                UserId = 1,
                User = user
            };

            Models.Task secondTask = new()
            {
                Id = 1,
                Title = "Second task",
                Description = "Description of the second task",
                IsCompleted = false,
                DueDate = DateTime.Today.AddDays(3),
                UserId = 1,
                User = user
            };  

            user.Tasks = new List<Models.Task> { firstTask, secondTask };

            Assert.That(user.Tasks, Has.Count.EqualTo(2), "User must have 2 tasks associated with him.");
            Assert.Multiple(() =>
            {
                Assert.That(user.Tasks.Contains(firstTask), Is.True, "User must container first task.");
                Assert.That(user.Tasks.Contains(secondTask), Is.True, "User must container second task.");
            });
        }
    }
}
