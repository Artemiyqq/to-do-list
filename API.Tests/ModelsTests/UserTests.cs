using System.ComponentModel.DataAnnotations;

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

            ValidationContext context = new(user, serviceProvider: null, items: null);
            List<ValidationResult> result = new();
            bool isValid = Validator.TryValidateObject(user, context, result, validateAllProperties: true);

            Assert.That(isValid, Is.True, "User model should pass validation");
        }
    }
}
