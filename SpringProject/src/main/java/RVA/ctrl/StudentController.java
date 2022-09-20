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
import RVA.model.Status;
import RVA.model.Student;
import RVA.repositories.DepartmanRepository;
import RVA.repositories.StatusRepository;
import RVA.repositories.StudentRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@Api(tags={"CRUD operations on Student table"})
public class StudentController {

	@Autowired
	private StudentRepository repo;
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired 
	private StatusRepository statusRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/student")
	@ApiOperation(value="Method which returns all Student")
	public Collection<Student> getAllStudenti(){
		return repo.findAll();
	}
	
	@GetMapping("/student/{id}")
	@ApiOperation(value="Method which returns one specific Student")
	public Student getStudentiById(@PathVariable int id) {
		return repo.getById(id);
	}
	
	@GetMapping("/student/departman/{departman}")
	@ApiOperation(value="Method which get student by departman")
	public Collection <Student> getStudentiByDepartman(@PathVariable int departman){
		Departman temp = departmanRepository.getById(departman);
		return repo.findByDepartman(temp);
	}
	
	@GetMapping("/student/status/{status}")
	@ApiOperation(value="Method which get Student by status")
	public Collection <Student> getStudentiByStatus(@PathVariable int status){
		Status temp = statusRepository.getById(status);
		return repo.findByStatus(temp);
	}
	
	@PostMapping("/student")
	@ApiOperation(value="Method which create Student")
	public ResponseEntity<Student> createStudent(@RequestBody Student student){
		if(!repo.existsById(student.getId())) {
			Student temp = repo.save(student);
			return new ResponseEntity<Student>(temp, HttpStatus.CREATED);
		}else {
			return new ResponseEntity<Student>(HttpStatus.CONFLICT);
		}
		}
		
	@PutMapping("/student")
	@ApiOperation(value="Method which update Student")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student){
		if(repo.existsById(student.getId())) {
			repo.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}else {
			return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/student/{id}")
	@ApiOperation(value="Method which delete Student")
	public ResponseEntity<Student> deleteStudent(@PathVariable int id){
		if(repo.existsById(id)) {
			if(id == -100) {
				repo.deleteById(id);
				jdbcTemplate.execute("Insert into student(\"id\",\"ime\",\"prezime\",\"broj_indeksa\",\"departman\",\"status\")"
						+ "values(-100,'Maja','Jovic','MH2/2017',1,1)");
				return new ResponseEntity<Student>(HttpStatus.OK);
			}else {
				repo.deleteById(id);
				return new ResponseEntity<Student>(HttpStatus.OK);
			}
	}else {
		return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
}
	}
}
