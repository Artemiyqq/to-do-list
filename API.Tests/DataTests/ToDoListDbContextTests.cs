using API.Data;
using Microsoft.EntityFrameworkCore;

namespace ToDoList.Tests
{
    [TestFixture]
    public class ToDoListDbContextTests
    {
        [Test]
        public void ToDoListDbContext_CanConnectToDatabase()
        {
            var options = new DbContextOptionsBuilder<ToDoListDbContext>()
                .UseNpgsql("appsettings.json")
                .Options;

            using (ToDoListDbContext dbContext = new(options))
            {
                Assert.DoesNotThrow(() => dbContext.Database.CanConnect(), "DbContext should be able to connect to database");
            }
        }
    }
}
