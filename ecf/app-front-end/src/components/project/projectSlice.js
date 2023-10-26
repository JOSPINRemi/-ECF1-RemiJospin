import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://127.0.0.1:3000/projects";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Something went wrong when getting projects");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  }
);

export const fetchProject = createAsyncThunk(
  "projects/fetchProject",
  async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Something went wrong when getting project");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Something went wrong when deliting project");
    }
    return id;
  }
);

export const editProject = createAsyncThunk(
  "projects/editProject",
  async ({ id, ...project }) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error("Something went wrong when editing project");
    }
    const data = await response.json();
    return { id, ...data };
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project) => {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error("Something went wrong when adding project");
    }
    const data = await response.json();
    return { id: data.id, ...album };
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    isLoading: false,
    formMode: "add",
    error: null,
    selectedProject: null,
  },
  reducers: {
    setFormMode: (state, action) => {
      state.formMode = action.payload;
      console.log(state.formMode);
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.projects = [];
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
    });

    builder.addCase(fetchProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.selectedProject = null;
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedProject = action.payload;
    });

    builder.addCase(addProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
    });

    builder.addCase(editProject.fulfilled, (state, action) => {
      state.projects = [
        ...state.projects.filter((p) => p.id != action.payload.id),
        action.payload,
      ];
    });

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter((p) => p.id != action.payload);
    });
  },
});

export const { setFormMode, setSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
