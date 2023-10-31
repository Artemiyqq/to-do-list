using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class TaskDto
    {
        [Required]
        public string Title { get; set; } = default!;
        [Required]
        public string Description { get; set; } = default!;
        [Required]
        public string DueDate { get; set; } = default!;
        [Required]
        public int UserId { get; set; } = default!;
    }
}
