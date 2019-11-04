package com.neggo.neggo.controller.handle;

public class ModuleForm {
    private String name;
    private Long courseID;

    public ModuleForm() {
    }

    public ModuleForm(String name, Long courseID) {
        this.name = name;
        this.courseID = courseID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCourseID() {
        return courseID;
    }

    public void setCourseID(Long courseID) {
        this.courseID = courseID;
    }

    @Override
    public String toString() {
        return "ModuleForm{" +
                "name='" + name + '\'' +
                ", courseID=" + courseID +
                '}';
    }
}
