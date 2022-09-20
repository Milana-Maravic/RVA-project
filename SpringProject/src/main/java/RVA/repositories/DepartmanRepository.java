package RVA.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Departman;
import RVA.model.Fakultet;

public interface DepartmanRepository extends JpaRepository<Departman,Integer>{

	Collection<Departman>findByFakultet(Fakultet fakultet);
	
}
