using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Entities
{
    [Table("Specialties",Schema ="Specialty")]
    public class Specialty : BaseEntity
    {
        [MaxLength(100)]
        public string ImageName { get; set; }
        public ICollection<User> users { get; set; }
        public ICollection<Post> posts { get; set; }
    }
}
