using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; } 

        public required string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime DueDate { get; set; }

        public int UserId { get; set; }

        public required User User { get; set; } 
    }
}
