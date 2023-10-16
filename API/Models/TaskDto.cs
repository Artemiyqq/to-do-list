namespace API.Models
{
    public class TaskDto
    {
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string DueDate { get; set; } = default!;
        public int UserId { get; set; } = default!;
    }
}
