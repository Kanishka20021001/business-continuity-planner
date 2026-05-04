package com.internship.repository;

import com.internship.entity.ContinuityPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContinuityPlanRepository extends JpaRepository<ContinuityPlan, Long> {

    List<ContinuityPlan> findByTitleContainingIgnoreCase(String keyword);

    List<ContinuityPlan> findByStatus(String status);

    List<ContinuityPlan> findByTitleContainingIgnoreCaseAndStatus(String keyword, String status);
}