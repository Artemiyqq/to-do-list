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

            var validationResult = ModelValidator.ValidateModel(task);

            Assert.That(validationResult, Is.Empty, "Task model should pass validation");
        }
    }
}
