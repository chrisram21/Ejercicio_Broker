package arqui.broker.controllers;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody String pedidoJson) {
        String urlNest = "http://localhost:3000/api/v1/pedidos";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(pedidoJson, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                urlNest,
                HttpMethod.POST,
                entity,
                String.class
        );

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}