using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Entities
{
    [Table("Posts",Schema ="User")]
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(30)]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public bool IsCompleted { get; set; }
        public int? MasterUserId { get; set; }
        public bool Isactive { get; set; }

        [Required]
        public int UserId { get; set; }
        public User user { get; set; }

        [Required]
        public int SpecialtyId { get; set; }
        public Specialty specialty { get; set; }
    }
}
