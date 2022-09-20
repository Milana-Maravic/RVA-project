package RVA.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Fakultet;

public interface FakultetRepository extends JpaRepository<Fakultet,Integer>{

	Collection<Fakultet>findByNazivContainingIgnoreCase(String naziv);
}
