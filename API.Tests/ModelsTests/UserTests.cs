namespace API.Tests.ModelsTests
{
    [TestFixture]
    public class UserTests
    {
        [Test]
        public void User_Model_Validations()
        {
            User user = new()
            {
                FirstName = "Ivan",
                LastName = "Ivanenko",
                Email = "ivan.ivanenko@example.com",
                PasswordHash = "passssworrd"
            };

            var validationResult = ModelValidator.ValidateModel(user);

            Assert.That(validationResult, Is.Empty, "User model should pass validation");
        }

        [Test]
        public void User_FirstNameIsMissing_Error()
        {
            User user = new()
            {
                LastName = "Ivanenko",
                Email = "ivan.ivanenko@example.com",
                PasswordHash = "passssworrd"
            };

            var validationResult = ModelValidator.ValidateModel(user);
            Assert.Multiple(() =>
            {
                Assert.That(validationResult, Is.Not.Empty, "Validation should fail due to missing FirstName");
                Assert.That(validationResult, Has.Count.EqualTo(1), "There should be one validation error.");
                Assert.That(validationResult.Any(e => e.ErrorMessage!.Contains("required")), Is.True, "Validation error should contain 'required'");
            });
        }
    }
}
