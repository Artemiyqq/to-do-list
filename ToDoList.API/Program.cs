using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;


namespace ToDoList.API
{
    public class Program
    {
        private static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseKestrel(options =>
                    {
                        options.ListenAnyIP(5001, listenOptions =>
                        {
                            listenOptions.UseHttps();
                        });
                    });
                });
    }
}