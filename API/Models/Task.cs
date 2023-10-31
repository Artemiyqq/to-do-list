using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; }

        public string Description { get; set; } = default!;

        public bool IsCompleted { get; set; } = false;

        public DateOnly DueDate { get; set; }

        public int UserId { get; set; }
    }
}
