using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SearchHire.Data.Entities
{
    [Table("Provinces",Schema ="Location")]
    public class Province : BaseEntity
    {
    }
}
