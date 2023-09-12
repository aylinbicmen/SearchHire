using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Entities
{
    [Table("Cities",Schema ="Location")]
    public class City : BaseEntity
    {
        [Required]
        public int ProvinceId { get; set; }
        public Province Province { get; set; }
    }
}
