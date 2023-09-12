using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Entities
{
    [Table("Users", Schema = "User")]
    public class User : BaseEntity
    {
        [Required]
        public string Surname { get; set; }
        [Required, MaxLength(50)]
        public string Email { get; set; }
        [Required, MinLength(8)]
        public string Password { get; set; }
        [MinLength(8) ,MaxLength(10)]
        public string? Phone { get; set; }
        public string? Address { get; set; }
        [Required]
        public DateTime JoinDate { get; set; }
        public int? WorkDone { get; set; }
        [Required]
        public bool IsMasterUser { get; set; }
        [Required]
        public bool IsActive { get; set; }
        public bool? IsSubscribed { get; set; }

        public int? CityId { get; set; }
        public City City { get; set; }

        public int? SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }

        public ICollection<Post> posts { get; set; }
    }
}
