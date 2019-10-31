package com.mycompany.myapp.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mycompany.myapp.domain.Board3;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.Board3Repository;
import com.mycompany.myapp.service.dto.Board3Criteria;
import com.mycompany.myapp.service.dto.Board3DTO;
import com.mycompany.myapp.service.mapper.Board3Mapper;

/**
 * Service for executing complex queries for {@link Board3} entities in the database.
 * The main input is a {@link Board3Criteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Board3DTO} or a {@link Page} of {@link Board3DTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class Board3QueryService extends QueryService<Board3> {

    private final Logger log = LoggerFactory.getLogger(Board3QueryService.class);

    private final Board3Repository board3Repository;

    private final Board3Mapper board3Mapper;

    public Board3QueryService(Board3Repository board3Repository, Board3Mapper board3Mapper) {
        this.board3Repository = board3Repository;
        this.board3Mapper = board3Mapper;
    }

    /**
     * Return a {@link List} of {@link Board3DTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Board3DTO> findByCriteria(Board3Criteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Board3> specification = createSpecification(criteria);
        return board3Mapper.toDto(board3Repository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link Board3DTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Board3DTO> findByCriteria(Board3Criteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Board3> specification = createSpecification(criteria);
        return board3Repository.findAll(specification, page)
            .map(board3Mapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(Board3Criteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Board3> specification = createSpecification(criteria);
        return board3Repository.count(specification);
    }

    /**
     * Function to convert {@link Board3Criteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Board3> createSpecification(Board3Criteria criteria) {
        Specification<Board3> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Board3_.id));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), Board3_.title));
            }
            if (criteria.getContents() != null) {
                specification = specification.and(buildStringSpecification(criteria.getContents(), Board3_.contents));
            }
            if (criteria.getCreatedDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCreatedDate(), Board3_.createdDate));
            }
        }
        return specification;
    }
}
