namespace API.Tests.ModelsTests
{
    [TestFixture]
    public class TaskDtoTest
    {
        [Test]
        public void TaskDto_Validation_ShouldPassForValidModel()
        {
            // Arrange
            var validTaskDto = new TaskDto
            {
                Title = "Valid Title",
                Description = "Valid Description",
                DueDate = "2023-12-31",
                UserId = 1
            };

            // Act
            List<ValidationResult> validationResult = ModelValidator.ValidateModel(validTaskDto);

            // Assert
            Assert.That(validationResult, Is.Empty, "Model should be valid when all properties have valid values.");
        }

        [Test]
        public void TaskDto_Validation_ShouldFailForInvalidModel()
        {
            // Arrange
            var invalidTaskDto = new TaskDto();

            // Act
            List<ValidationResult> validationResult = ModelValidator.ValidateModel(invalidTaskDto);

            // Assert
            Assert.That(validationResult, !Is.Empty, "Model should be invalid when required properties are not provided.");
        }
    }
}