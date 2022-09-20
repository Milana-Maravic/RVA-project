package RVA.ctrl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import RVA.model.Status;
import RVA.repositories.StatusRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags={"CRUD operations on Status table"})
public class StatusController {

	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/status")
	@ApiOperation(value="Method which returns all Status")
	public Collection<Status> getAllStatus(){
		return statusRepository.findAll();
	}
	
	@GetMapping("/status/{id}")
	@ApiOperation(value="Method which returns one specific Status")
	public Status getStatusById(@PathVariable int id) {
		return statusRepository.getById(id);
	}
	
	@GetMapping("/status/naziv/{naziv}")
	@ApiOperation(value="Method which return Status by naziv")
	public Collection<Status>getStatusByNaziv(@PathVariable String naziv){
	return statusRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("/status")
	@ApiOperation(value="Method which create Status")
	public ResponseEntity <Status> createStatus(@RequestBody Status status){
		if(!statusRepository.existsById(status.getId())) {
			Status temp = statusRepository.save(status);
			return new ResponseEntity <Status> (temp, HttpStatus.CREATED);
		}else {
			return new ResponseEntity <Status> (HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping("/status")
	@ApiOperation(value="Method which update Status")
	public ResponseEntity <Status> updateStatus(@RequestBody Status status) {
		if(statusRepository.existsById(status.getId())) {
			statusRepository.save(status);
			return new ResponseEntity <Status> (HttpStatus.OK);
		}else {
			return new ResponseEntity <Status> (HttpStatus.CONFLICT);
		}
  }
	
	@DeleteMapping("/status/{id}")
	@ApiOperation(value="Method which delete Status")
	public ResponseEntity<Status> deleteStatus(@PathVariable int id){
		if(statusRepository.existsById(id)) {
			if(id == -100) {
				statusRepository.deleteById(id);
				jdbcTemplate.execute("Insert into status(\"id\",\"naziv\",\"oznaka\")"
						+ "values(-100,'Pauza','P')");
				return new ResponseEntity<Status>(HttpStatus.OK);
			}else {
				statusRepository.deleteById(id);
				return new ResponseEntity<Status>(HttpStatus.OK);
			}
		}else {
			return new ResponseEntity<Status>(HttpStatus.NOT_FOUND);
		}
	}
}
