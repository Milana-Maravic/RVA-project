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

import RVA.model.Fakultet;
import RVA.repositories.FakultetRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags={"CRUD operations on Fakultet table"})
public class FakultetController {

	@Autowired
	public FakultetRepository fakultetRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/fakultet")
	@ApiOperation(value="Method which returns all Fakultet")
	public Collection<Fakultet> getAllFaculty(){
		return fakultetRepository.findAll();
	}
	
	@GetMapping("/fakultet/{id}")
	@ApiOperation(value="Method which returns one specific Fakultet")
	public Fakultet getFakultetById(@PathVariable int id){
		return fakultetRepository.getById(id);
	}
	
	@GetMapping("/fakultet/naziv/{naziv}")
	@ApiOperation(value="Method which return Fakultet by naziv")
	public Collection<Fakultet>getFakultetByNaziv(@PathVariable String naziv){
	return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("/fakultet")
	@ApiOperation(value="Method which create Fakultet")
	public ResponseEntity <Fakultet> createFakultet(@RequestBody Fakultet fakultet){
		if(!fakultetRepository.existsById(fakultet.getId())) {
		Fakultet temp = fakultetRepository.save(fakultet);
		return new ResponseEntity <Fakultet> (temp, HttpStatus.CREATED);
		}else {
			return new ResponseEntity <Fakultet> (HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping("/fakultet")
	@ApiOperation(value="Method which update Fakultet")
	public ResponseEntity <Fakultet> updateFakultet(@RequestBody Fakultet fakultet){
		if(fakultetRepository.existsById(fakultet.getId())) {
			fakultetRepository.save(fakultet);
			return new ResponseEntity <Fakultet> (HttpStatus.OK);
		}else {
			return new ResponseEntity <Fakultet> (HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/fakultet/{id}")
	@ApiOperation(value="Method which delete Fakultet")
	public ResponseEntity<Fakultet> deleteFakultet(@PathVariable int id){
		if(fakultetRepository.existsById(id)) {
			if(id == -100) {
				fakultetRepository.deleteById(id);
				jdbcTemplate.execute("Insert into fakultet(\"id\",\"naziv\",\"sediste\")"
						+ "values(-100,'Fakultet politickih nauka','Subotica')");
				return new ResponseEntity<Fakultet>(HttpStatus.OK);
			}else {
				fakultetRepository.deleteById(id);
				return new ResponseEntity<Fakultet>(HttpStatus.OK);
			}
		}else {
			return new ResponseEntity<Fakultet>(HttpStatus.NOT_FOUND);
		}
	}
}
