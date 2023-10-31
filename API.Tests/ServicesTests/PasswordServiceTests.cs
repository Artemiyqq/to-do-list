namespace API.Tests.ServicesTests
{
    public class PasswordServiceTests
    {
        [Test]
        public void HashAndVerify_PasswordMatchesOriginal_ReturnsTrue()
        {
            // Arange
            string password = "securepassword123";

            // Act
            string hashedPassword = PasswordService.Hash(password);
            bool result = PasswordService.Verify(password, hashedPassword);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void Verify_InvalidPassword_ReturnsFalse()
        {
            // Arrange
            string originalPassword = "securepassword123";
            string wrongPassword = "wrongpassword";

            // Act
            string hashedPassword = PasswordService.Hash(originalPassword);
            bool resutl = PasswordService.Verify(wrongPassword, hashedPassword);

            // Assert
            Assert.That(resutl, Is.False);
        }
    }
}
