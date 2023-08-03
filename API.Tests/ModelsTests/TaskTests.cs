using System.ComponentModel.DataAnnotations;

namespace API.Tests.ModelsTests
{
    [TestFixture]
    public class TaskTests
    {
        [Test]
        public void Task_Model_Validation()
        {
            Models.Task task = new()
            {
                Title = "Sample task",
                Description = "Just sample task for test",
                DueDate = DateTime.Today.AddDays(7),
                UserId = 1
            };

            ValidationContext context = new(task, serviceProvider: null, items: null);
            List<ValidationResult> results = new();
            bool isValid = Validator.TryValidateObject(task, context, results, validateAllProperties: true);

            Assert.That(isValid, Is.True, "Task model should pass validation");
        }
    }
}
