using System.ComponentModel.DataAnnotations;

namespace ToDoList.API.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; } 

        [Required]
        public required string Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime DueDate { get; set; }

        public int UserId { get; set; }

        [Required]
        public required User User { get; set; } 
    }
}
