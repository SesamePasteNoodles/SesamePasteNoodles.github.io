export interface SkillGroup {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'FRONTEND',
    items: ['Vue 3', 'Bootstrap', 'Pinia', 'Axios'],
  },
  {
    title: 'BACKEND',
    items: ['ASP.NET Core', 'EF Core', 'ADO.NET', 'Dapper'],
  },
  {
    title: 'DATABASE',
    items: ['Microsoft SQL Server'],
  },
  {
    title: 'VERSION CONTROL',
    items: ['Git', 'GitHub'],
  },
  {
    title: 'API TESTING',
    items: ['Postman', 'Swagger'],
  },
]
