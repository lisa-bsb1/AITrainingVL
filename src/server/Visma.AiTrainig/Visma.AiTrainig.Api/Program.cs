using Visma.AiTrainig.Api.Configuration;

namespace Visma.AiTrainig.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateSlimBuilder(args);

            // Configure services
            builder.ConfigureServices();

            var app = builder.Build();

            // Configure application
            app.ConfigureApplication();

            app.Run();
        }
    }
}
