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
                DueDate = DateOnly.Parse(DateTime.Today.ToString("d")),
                UserId = 1
            };

            List<ValidationResult> validationResult = ModelValidator.ValidateModel(task);

            Assert.That(validationResult, Is.Empty, "Task model should pass validation");
        }
    }
}
