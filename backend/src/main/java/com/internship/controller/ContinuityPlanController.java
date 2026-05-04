package com.internship.tool.controller;

import com.internship.tool.entity.ContinuityPlan;
import com.internship.tool.service.ContinuityPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin("*")
public class ContinuityPlanController {

    @Autowired
    private ContinuityPlanService service;

    @GetMapping
    public List<ContinuityPlan> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ContinuityPlan create(@RequestBody ContinuityPlan plan) {
        return service.create(plan);
    }

   @DeleteMapping("/{id}")
public void deletePlan(@PathVariable Long id) {
    service.delete(id);
}

   @PutMapping("/{id}")
public ContinuityPlan update(@PathVariable Long id, @RequestBody ContinuityPlan plan) {
    plan.setId(id);
    return service.create(plan);
}
}