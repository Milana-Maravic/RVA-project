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

import RVA.model.Departman;
import RVA.model.Fakultet;
import RVA.repositories.DepartmanRepository;
import RVA.repositories.FakultetRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags={"CRUD operations on Departman table"})
public class DepartmanController {

	@Autowired
	private DepartmanRepository repo;
	
	@Autowired
	private FakultetRepository fakultetRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/departman")
	@ApiOperation(value="Method which returns all Departman")
	public Collection<Departman> getAllDepartmani() {
		return repo.findAll();
	}
	
	@GetMapping("/departman/{id}")
	@ApiOperation(value="Method which returns one specific Departman")
	public Departman getDepartmaniById(@PathVariable int id) {
		return repo.getById(id);
	}
	
	@GetMapping("/departman/fakultet/{fakultet}")
	@ApiOperation(value="Method which get Departman by fakultet")
	public Collection<Departman> getDepartmaniByFakultet(@PathVariable int fakultet){
		Fakultet temp = fakultetRepository.getById(fakultet);
		return repo.findByFakultet(temp);
	}
	
	@PostMapping("/departman")
	@ApiOperation(value="Method which create Departman")
	public ResponseEntity<Departman> createDepartman(@RequestBody Departman departman) {
		if(!repo.existsById(departman.getId())) {
			Departman temp = repo.save(departman);
			return new ResponseEntity<Departman>(temp, HttpStatus.CREATED);
		}else {
			return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping("/departman")
	@ApiOperation(value="Method which update Departman")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman){
		if(repo.existsById(departman.getId())) {
			repo.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}else {
			return new ResponseEntity<Departman>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/departman/{id}")
	@ApiOperation(value="Method which delete Departman")
	public ResponseEntity<Departman> deleteDepartman(@PathVariable int id){
		if(repo.existsById(id)) {
			if(id == -100) {
				repo.deleteById(id);
				jdbcTemplate.execute("Insert into departman(\"id\",\"naziv\",\"oznaka\",\"fakultet\")"
						+ "values(-100,'Departman za kozmetologiju','DKO',2)");
				return new ResponseEntity<Departman>(HttpStatus.OK);
			}else {
				repo.deleteById(id);
				return new ResponseEntity<Departman>(HttpStatus.OK);
			}
		}else {
			return new ResponseEntity<Departman>(HttpStatus.NOT_FOUND);
		}
	}
}
