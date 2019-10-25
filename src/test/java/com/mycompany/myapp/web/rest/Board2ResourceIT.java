package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterBoardTest1App;
import com.mycompany.myapp.domain.Board2;
import com.mycompany.myapp.repository.Board2Repository;
import com.mycompany.myapp.service.Board2Service;
import com.mycompany.myapp.service.dto.Board2DTO;
import com.mycompany.myapp.service.mapper.Board2Mapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Board2Resource} REST controller.
 */
@SpringBootTest(classes = JhipsterBoardTest1App.class)
public class Board2ResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENTS = "AAAAAAAAAA";
    private static final String UPDATED_CONTENTS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private Board2Repository board2Repository;

    @Autowired
    private Board2Mapper board2Mapper;

    @Autowired
    private Board2Service board2Service;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBoard2MockMvc;

    private Board2 board2;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Board2Resource board2Resource = new Board2Resource(board2Service);
        this.restBoard2MockMvc = MockMvcBuilders.standaloneSetup(board2Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Board2 createEntity(EntityManager em) {
        Board2 board2 = new Board2()
            .title(DEFAULT_TITLE)
            .contents(DEFAULT_CONTENTS)
            .createdDate(DEFAULT_CREATED_DATE);
        return board2;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Board2 createUpdatedEntity(EntityManager em) {
        Board2 board2 = new Board2()
            .title(UPDATED_TITLE)
            .contents(UPDATED_CONTENTS)
            .createdDate(UPDATED_CREATED_DATE);
        return board2;
    }

    @BeforeEach
    public void initTest() {
        board2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createBoard2() throws Exception {
        int databaseSizeBeforeCreate = board2Repository.findAll().size();

        // Create the Board2
        Board2DTO board2DTO = board2Mapper.toDto(board2);
        restBoard2MockMvc.perform(post("/api/board-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board2DTO)))
            .andExpect(status().isCreated());

        // Validate the Board2 in the database
        List<Board2> board2List = board2Repository.findAll();
        assertThat(board2List).hasSize(databaseSizeBeforeCreate + 1);
        Board2 testBoard2 = board2List.get(board2List.size() - 1);
        assertThat(testBoard2.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testBoard2.getContents()).isEqualTo(DEFAULT_CONTENTS);
        assertThat(testBoard2.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createBoard2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = board2Repository.findAll().size();

        // Create the Board2 with an existing ID
        board2.setId(1L);
        Board2DTO board2DTO = board2Mapper.toDto(board2);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoard2MockMvc.perform(post("/api/board-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board2DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Board2 in the database
        List<Board2> board2List = board2Repository.findAll();
        assertThat(board2List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBoard2S() throws Exception {
        // Initialize the database
        board2Repository.saveAndFlush(board2);

        // Get all the board2List
        restBoard2MockMvc.perform(get("/api/board-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(board2.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].contents").value(hasItem(DEFAULT_CONTENTS)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getBoard2() throws Exception {
        // Initialize the database
        board2Repository.saveAndFlush(board2);

        // Get the board2
        restBoard2MockMvc.perform(get("/api/board-2-s/{id}", board2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(board2.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.contents").value(DEFAULT_CONTENTS))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBoard2() throws Exception {
        // Get the board2
        restBoard2MockMvc.perform(get("/api/board-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoard2() throws Exception {
        // Initialize the database
        board2Repository.saveAndFlush(board2);

        int databaseSizeBeforeUpdate = board2Repository.findAll().size();

        // Update the board2
        Board2 updatedBoard2 = board2Repository.findById(board2.getId()).get();
        // Disconnect from session so that the updates on updatedBoard2 are not directly saved in db
        em.detach(updatedBoard2);
        updatedBoard2
            .title(UPDATED_TITLE)
            .contents(UPDATED_CONTENTS)
            .createdDate(UPDATED_CREATED_DATE);
        Board2DTO board2DTO = board2Mapper.toDto(updatedBoard2);

        restBoard2MockMvc.perform(put("/api/board-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board2DTO)))
            .andExpect(status().isOk());

        // Validate the Board2 in the database
        List<Board2> board2List = board2Repository.findAll();
        assertThat(board2List).hasSize(databaseSizeBeforeUpdate);
        Board2 testBoard2 = board2List.get(board2List.size() - 1);
        assertThat(testBoard2.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testBoard2.getContents()).isEqualTo(UPDATED_CONTENTS);
        assertThat(testBoard2.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBoard2() throws Exception {
        int databaseSizeBeforeUpdate = board2Repository.findAll().size();

        // Create the Board2
        Board2DTO board2DTO = board2Mapper.toDto(board2);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoard2MockMvc.perform(put("/api/board-2-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board2DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Board2 in the database
        List<Board2> board2List = board2Repository.findAll();
        assertThat(board2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBoard2() throws Exception {
        // Initialize the database
        board2Repository.saveAndFlush(board2);

        int databaseSizeBeforeDelete = board2Repository.findAll().size();

        // Delete the board2
        restBoard2MockMvc.perform(delete("/api/board-2-s/{id}", board2.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Board2> board2List = board2Repository.findAll();
        assertThat(board2List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Board2.class);
        Board2 board21 = new Board2();
        board21.setId(1L);
        Board2 board22 = new Board2();
        board22.setId(board21.getId());
        assertThat(board21).isEqualTo(board22);
        board22.setId(2L);
        assertThat(board21).isNotEqualTo(board22);
        board21.setId(null);
        assertThat(board21).isNotEqualTo(board22);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(Board2DTO.class);
        Board2DTO board2DTO1 = new Board2DTO();
        board2DTO1.setId(1L);
        Board2DTO board2DTO2 = new Board2DTO();
        assertThat(board2DTO1).isNotEqualTo(board2DTO2);
        board2DTO2.setId(board2DTO1.getId());
        assertThat(board2DTO1).isEqualTo(board2DTO2);
        board2DTO2.setId(2L);
        assertThat(board2DTO1).isNotEqualTo(board2DTO2);
        board2DTO1.setId(null);
        assertThat(board2DTO1).isNotEqualTo(board2DTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(board2Mapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(board2Mapper.fromId(null)).isNull();
    }
}
