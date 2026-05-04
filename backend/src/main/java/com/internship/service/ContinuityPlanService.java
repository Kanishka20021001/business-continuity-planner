package com.internship.tool.service;

import com.internship.tool.entity.ContinuityPlan;
import com.internship.tool.repository.ContinuityPlanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class ContinuityPlanService {

    @Autowired
    private ContinuityPlanRepository repo;

    // ✅ Pagination method
    public Page<ContinuityPlan> getAll(int page, int size) {
        return repo.findAll(PageRequest.of(page, size));
    }

    // ✅ For export/search (non-paginated)
    public List<ContinuityPlan> getAll() {
        return repo.findAll();
    }

    public ContinuityPlan create(ContinuityPlan plan) {
        return repo.save(plan);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // ✅ FIXED search method
    public List<ContinuityPlan> search(String q, String status) {

        if (q != null && !q.isEmpty() && status != null && !status.isEmpty()) {
            return repo.findByTitleContainingIgnoreCaseAndStatus(q, status);
        } 
        else if (q != null && !q.isEmpty()) {
            return repo.findByTitleContainingIgnoreCase(q);
        } 
        else if (status != null && !status.isEmpty()) {
            return repo.findByStatus(status);
        } 
        else {
            return repo.findAll();
        }
    }
}