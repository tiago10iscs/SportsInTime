using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_sportsintime.Models;

namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly bdContext _context;

        public ReportController(bdContext context)
        {
            _context = context;
        }

        // GET: api/Report
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetReport()
        {
            

            List<Report> allNonVerified = new List<Report>();
            for(int i = 1; i < _context.Reports.ToArray().Length + 1; i++){
                 var report = await _context.Reports.FindAsync((long)i);
                 if(report.isVerified == false){
                     allNonVerified.Add(report);
                 }
            } 

            return allNonVerified;
        }

        // GET: api/Report/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(long id)
        {
            var report = await _context.Reports.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

        // PUT: api/Report/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReport(long id, Boolean banOption)
        {

           var reporter = await _context.Reports.FindAsync(id);

           if(reporter == null){
               return NotFound();
           }

           reporter.isVerified = true;

            try
            {
                if(banOption == true){

                    var user = await _context.Users.FindAsync(reporter.idUser);
                    
                    if(user == null){
                        return NotFound();
                    }
                    user.IsBanned = true;
                    System.Console.WriteLine(user.Name);
                    System.Console.WriteLine(user.IsBanned);
                    reporter.banOption = true;

                }
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ReportExists(id))
            {
                    return NotFound();
            }

            return NoContent();
        }

        // POST: api/Report
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Report>> PostReport(Report report)
        {
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReport", new { id = report.Id }, report);
        }

        // DELETE: api/Report/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(long id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReportExists(long id)
        {
            return _context.Reports.Any(e => e.Id == id);
        }
    }
}
