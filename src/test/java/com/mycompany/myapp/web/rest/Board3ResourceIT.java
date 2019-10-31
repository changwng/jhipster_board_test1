package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterBoardTest1App;
import com.mycompany.myapp.domain.Board3;
import com.mycompany.myapp.repository.Board3Repository;
import com.mycompany.myapp.service.Board3Service;
import com.mycompany.myapp.service.dto.Board3DTO;
import com.mycompany.myapp.service.mapper.Board3Mapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;
import com.mycompany.myapp.service.dto.Board3Criteria;
import com.mycompany.myapp.service.Board3QueryService;

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
 * Integration tests for the {@link Board3Resource} REST controller.
 */
@SpringBootTest(classes = JhipsterBoardTest1App.class)
public class Board3ResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENTS = "AAAAAAAAAA";
    private static final String UPDATED_CONTENTS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_CREATED_DATE = LocalDate.ofEpochDay(-1L);

    @Autowired
    private Board3Repository board3Repository;

    @Autowired
    private Board3Mapper board3Mapper;

    @Autowired
    private Board3Service board3Service;

    @Autowired
    private Board3QueryService board3QueryService;

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

    private MockMvc restBoard3MockMvc;

    private Board3 board3;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Board3Resource board3Resource = new Board3Resource(board3Service, board3QueryService);
        this.restBoard3MockMvc = MockMvcBuilders.standaloneSetup(board3Resource)
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
    public static Board3 createEntity(EntityManager em) {
        Board3 board3 = new Board3()
            .title(DEFAULT_TITLE)
            .contents(DEFAULT_CONTENTS)
            .createdDate(DEFAULT_CREATED_DATE);
        return board3;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Board3 createUpdatedEntity(EntityManager em) {
        Board3 board3 = new Board3()
            .title(UPDATED_TITLE)
            .contents(UPDATED_CONTENTS)
            .createdDate(UPDATED_CREATED_DATE);
        return board3;
    }

    @BeforeEach
    public void initTest() {
        board3 = createEntity(em);
    }

    @Test
    @Transactional
    public void createBoard3() throws Exception {
        int databaseSizeBeforeCreate = board3Repository.findAll().size();

        // Create the Board3
        Board3DTO board3DTO = board3Mapper.toDto(board3);
        restBoard3MockMvc.perform(post("/api/board-3-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board3DTO)))
            .andExpect(status().isCreated());

        // Validate the Board3 in the database
        List<Board3> board3List = board3Repository.findAll();
        assertThat(board3List).hasSize(databaseSizeBeforeCreate + 1);
        Board3 testBoard3 = board3List.get(board3List.size() - 1);
        assertThat(testBoard3.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testBoard3.getContents()).isEqualTo(DEFAULT_CONTENTS);
        assertThat(testBoard3.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createBoard3WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = board3Repository.findAll().size();

        // Create the Board3 with an existing ID
        board3.setId(1L);
        Board3DTO board3DTO = board3Mapper.toDto(board3);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoard3MockMvc.perform(post("/api/board-3-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board3DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Board3 in the database
        List<Board3> board3List = board3Repository.findAll();
        assertThat(board3List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBoard3S() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List
        restBoard3MockMvc.perform(get("/api/board-3-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(board3.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].contents").value(hasItem(DEFAULT_CONTENTS)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getBoard3() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get the board3
        restBoard3MockMvc.perform(get("/api/board-3-s/{id}", board3.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(board3.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.contents").value(DEFAULT_CONTENTS))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getAllBoard3SByTitleIsEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where title equals to DEFAULT_TITLE
        defaultBoard3ShouldBeFound("title.equals=" + DEFAULT_TITLE);

        // Get all the board3List where title equals to UPDATED_TITLE
        defaultBoard3ShouldNotBeFound("title.equals=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByTitleIsNotEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where title not equals to DEFAULT_TITLE
        defaultBoard3ShouldNotBeFound("title.notEquals=" + DEFAULT_TITLE);

        // Get all the board3List where title not equals to UPDATED_TITLE
        defaultBoard3ShouldBeFound("title.notEquals=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByTitleIsInShouldWork() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where title in DEFAULT_TITLE or UPDATED_TITLE
        defaultBoard3ShouldBeFound("title.in=" + DEFAULT_TITLE + "," + UPDATED_TITLE);

        // Get all the board3List where title equals to UPDATED_TITLE
        defaultBoard3ShouldNotBeFound("title.in=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByTitleIsNullOrNotNull() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where title is not null
        defaultBoard3ShouldBeFound("title.specified=true");

        // Get all the board3List where title is null
        defaultBoard3ShouldNotBeFound("title.specified=false");
    }
                @Test
    @Transactional
    public void getAllBoard3SByTitleContainsSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where title contains DEFAULT_TITLE
        defaultBoard3ShouldBeFound("title.contains=" + DEFAULT_TITLE);

        // Get all the board3List where title contains UPDATED_TITLE
        defaultBoard3ShouldNotBeFound("title.contains=" + UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByTitleNotContainsSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where title does not contain DEFAULT_TITLE
        defaultBoard3ShouldNotBeFound("title.doesNotContain=" + DEFAULT_TITLE);

        // Get all the board3List where title does not contain UPDATED_TITLE
        defaultBoard3ShouldBeFound("title.doesNotContain=" + UPDATED_TITLE);
    }


    @Test
    @Transactional
    public void getAllBoard3SByContentsIsEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where contents equals to DEFAULT_CONTENTS
        defaultBoard3ShouldBeFound("contents.equals=" + DEFAULT_CONTENTS);

        // Get all the board3List where contents equals to UPDATED_CONTENTS
        defaultBoard3ShouldNotBeFound("contents.equals=" + UPDATED_CONTENTS);
    }

    @Test
    @Transactional
    public void getAllBoard3SByContentsIsNotEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where contents not equals to DEFAULT_CONTENTS
        defaultBoard3ShouldNotBeFound("contents.notEquals=" + DEFAULT_CONTENTS);

        // Get all the board3List where contents not equals to UPDATED_CONTENTS
        defaultBoard3ShouldBeFound("contents.notEquals=" + UPDATED_CONTENTS);
    }

    @Test
    @Transactional
    public void getAllBoard3SByContentsIsInShouldWork() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where contents in DEFAULT_CONTENTS or UPDATED_CONTENTS
        defaultBoard3ShouldBeFound("contents.in=" + DEFAULT_CONTENTS + "," + UPDATED_CONTENTS);

        // Get all the board3List where contents equals to UPDATED_CONTENTS
        defaultBoard3ShouldNotBeFound("contents.in=" + UPDATED_CONTENTS);
    }

    @Test
    @Transactional
    public void getAllBoard3SByContentsIsNullOrNotNull() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where contents is not null
        defaultBoard3ShouldBeFound("contents.specified=true");

        // Get all the board3List where contents is null
        defaultBoard3ShouldNotBeFound("contents.specified=false");
    }
                @Test
    @Transactional
    public void getAllBoard3SByContentsContainsSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where contents contains DEFAULT_CONTENTS
        defaultBoard3ShouldBeFound("contents.contains=" + DEFAULT_CONTENTS);

        // Get all the board3List where contents contains UPDATED_CONTENTS
        defaultBoard3ShouldNotBeFound("contents.contains=" + UPDATED_CONTENTS);
    }

    @Test
    @Transactional
    public void getAllBoard3SByContentsNotContainsSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where contents does not contain DEFAULT_CONTENTS
        defaultBoard3ShouldNotBeFound("contents.doesNotContain=" + DEFAULT_CONTENTS);

        // Get all the board3List where contents does not contain UPDATED_CONTENTS
        defaultBoard3ShouldBeFound("contents.doesNotContain=" + UPDATED_CONTENTS);
    }


    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate equals to DEFAULT_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.equals=" + DEFAULT_CREATED_DATE);

        // Get all the board3List where createdDate equals to UPDATED_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.equals=" + UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsNotEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate not equals to DEFAULT_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.notEquals=" + DEFAULT_CREATED_DATE);

        // Get all the board3List where createdDate not equals to UPDATED_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.notEquals=" + UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsInShouldWork() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate in DEFAULT_CREATED_DATE or UPDATED_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.in=" + DEFAULT_CREATED_DATE + "," + UPDATED_CREATED_DATE);

        // Get all the board3List where createdDate equals to UPDATED_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.in=" + UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate is not null
        defaultBoard3ShouldBeFound("createdDate.specified=true");

        // Get all the board3List where createdDate is null
        defaultBoard3ShouldNotBeFound("createdDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate is greater than or equal to DEFAULT_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.greaterThanOrEqual=" + DEFAULT_CREATED_DATE);

        // Get all the board3List where createdDate is greater than or equal to UPDATED_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.greaterThanOrEqual=" + UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate is less than or equal to DEFAULT_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.lessThanOrEqual=" + DEFAULT_CREATED_DATE);

        // Get all the board3List where createdDate is less than or equal to SMALLER_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.lessThanOrEqual=" + SMALLER_CREATED_DATE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsLessThanSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate is less than DEFAULT_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.lessThan=" + DEFAULT_CREATED_DATE);

        // Get all the board3List where createdDate is less than UPDATED_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.lessThan=" + UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void getAllBoard3SByCreatedDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        // Get all the board3List where createdDate is greater than DEFAULT_CREATED_DATE
        defaultBoard3ShouldNotBeFound("createdDate.greaterThan=" + DEFAULT_CREATED_DATE);

        // Get all the board3List where createdDate is greater than SMALLER_CREATED_DATE
        defaultBoard3ShouldBeFound("createdDate.greaterThan=" + SMALLER_CREATED_DATE);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultBoard3ShouldBeFound(String filter) throws Exception {
        restBoard3MockMvc.perform(get("/api/board-3-s?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(board3.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].contents").value(hasItem(DEFAULT_CONTENTS)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));

        // Check, that the count call also returns 1
        restBoard3MockMvc.perform(get("/api/board-3-s/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultBoard3ShouldNotBeFound(String filter) throws Exception {
        restBoard3MockMvc.perform(get("/api/board-3-s?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restBoard3MockMvc.perform(get("/api/board-3-s/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingBoard3() throws Exception {
        // Get the board3
        restBoard3MockMvc.perform(get("/api/board-3-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoard3() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        int databaseSizeBeforeUpdate = board3Repository.findAll().size();

        // Update the board3
        Board3 updatedBoard3 = board3Repository.findById(board3.getId()).get();
        // Disconnect from session so that the updates on updatedBoard3 are not directly saved in db
        em.detach(updatedBoard3);
        updatedBoard3
            .title(UPDATED_TITLE)
            .contents(UPDATED_CONTENTS)
            .createdDate(UPDATED_CREATED_DATE);
        Board3DTO board3DTO = board3Mapper.toDto(updatedBoard3);

        restBoard3MockMvc.perform(put("/api/board-3-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board3DTO)))
            .andExpect(status().isOk());

        // Validate the Board3 in the database
        List<Board3> board3List = board3Repository.findAll();
        assertThat(board3List).hasSize(databaseSizeBeforeUpdate);
        Board3 testBoard3 = board3List.get(board3List.size() - 1);
        assertThat(testBoard3.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testBoard3.getContents()).isEqualTo(UPDATED_CONTENTS);
        assertThat(testBoard3.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBoard3() throws Exception {
        int databaseSizeBeforeUpdate = board3Repository.findAll().size();

        // Create the Board3
        Board3DTO board3DTO = board3Mapper.toDto(board3);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoard3MockMvc.perform(put("/api/board-3-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(board3DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Board3 in the database
        List<Board3> board3List = board3Repository.findAll();
        assertThat(board3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBoard3() throws Exception {
        // Initialize the database
        board3Repository.saveAndFlush(board3);

        int databaseSizeBeforeDelete = board3Repository.findAll().size();

        // Delete the board3
        restBoard3MockMvc.perform(delete("/api/board-3-s/{id}", board3.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Board3> board3List = board3Repository.findAll();
        assertThat(board3List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Board3.class);
        Board3 board31 = new Board3();
        board31.setId(1L);
        Board3 board32 = new Board3();
        board32.setId(board31.getId());
        assertThat(board31).isEqualTo(board32);
        board32.setId(2L);
        assertThat(board31).isNotEqualTo(board32);
        board31.setId(null);
        assertThat(board31).isNotEqualTo(board32);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(Board3DTO.class);
        Board3DTO board3DTO1 = new Board3DTO();
        board3DTO1.setId(1L);
        Board3DTO board3DTO2 = new Board3DTO();
        assertThat(board3DTO1).isNotEqualTo(board3DTO2);
        board3DTO2.setId(board3DTO1.getId());
        assertThat(board3DTO1).isEqualTo(board3DTO2);
        board3DTO2.setId(2L);
        assertThat(board3DTO1).isNotEqualTo(board3DTO2);
        board3DTO1.setId(null);
        assertThat(board3DTO1).isNotEqualTo(board3DTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(board3Mapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(board3Mapper.fromId(null)).isNull();
    }
}
