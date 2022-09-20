package RVA.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Departman;
import RVA.model.Status;
import RVA.model.Student;


public interface StudentRepository extends JpaRepository<Student,Integer>{
	
	Collection<Student>findByDepartman(Departman departman);
	
	Collection<Student>findByStatus(Status temp);
	
	Collection<Student>findByIme(Student ime);

}
