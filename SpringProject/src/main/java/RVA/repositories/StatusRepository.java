package RVA.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Status;

public interface StatusRepository extends JpaRepository<Status,Integer>{

	Collection<Status>findByNazivContainingIgnoreCase(String naziv);

}
