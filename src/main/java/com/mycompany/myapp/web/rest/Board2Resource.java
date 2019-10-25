package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.Board2Service;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.Board2DTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Board2}.
 */
@RestController
@RequestMapping("/api")
public class Board2Resource {

    private final Logger log = LoggerFactory.getLogger(Board2Resource.class);

    private static final String ENTITY_NAME = "board2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Board2Service board2Service;

    public Board2Resource(Board2Service board2Service) {
        this.board2Service = board2Service;
    }

    /**
     * {@code POST  /board-2-s} : Create a new board2.
     *
     * @param board2DTO the board2DTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new board2DTO, or with status {@code 400 (Bad Request)} if the board2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/board-2-s")
    public ResponseEntity<Board2DTO> createBoard2(@RequestBody Board2DTO board2DTO) throws URISyntaxException {
        log.debug("REST request to save Board2 : {}", board2DTO);
        if (board2DTO.getId() != null) {
            throw new BadRequestAlertException("A new board2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Board2DTO result = board2Service.save(board2DTO);
        return ResponseEntity.created(new URI("/api/board-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /board-2-s} : Updates an existing board2.
     *
     * @param board2DTO the board2DTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated board2DTO,
     * or with status {@code 400 (Bad Request)} if the board2DTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the board2DTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/board-2-s")
    public ResponseEntity<Board2DTO> updateBoard2(@RequestBody Board2DTO board2DTO) throws URISyntaxException {
        log.debug("REST request to update Board2 : {}", board2DTO);
        if (board2DTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Board2DTO result = board2Service.save(board2DTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, board2DTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /board-2-s} : get all the board2S.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of board2S in body.
     */
    @GetMapping("/board-2-s")
    public List<Board2DTO> getAllBoard2S() {
        log.debug("REST request to get all Board2S");
        return board2Service.findAll();
    }

    /**
     * {@code GET  /board-2-s/:id} : get the "id" board2.
     *
     * @param id the id of the board2DTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the board2DTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/board-2-s/{id}")
    public ResponseEntity<Board2DTO> getBoard2(@PathVariable Long id) {
        log.debug("REST request to get Board2 : {}", id);
        Optional<Board2DTO> board2DTO = board2Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(board2DTO);
    }

    /**
     * {@code DELETE  /board-2-s/:id} : delete the "id" board2.
     *
     * @param id the id of the board2DTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/board-2-s/{id}")
    public ResponseEntity<Void> deleteBoard2(@PathVariable Long id) {
        log.debug("REST request to delete Board2 : {}", id);
        board2Service.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
