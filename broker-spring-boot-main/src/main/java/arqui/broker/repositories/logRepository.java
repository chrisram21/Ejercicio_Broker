package arqui.broker.repositories;

import arqui.broker.models.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface logRepository extends JpaRepository<Log, Integer> {
    //Aqui van las operaciones que se pueden hacer con el modelo

}
