// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  authTokenName: 'S1G4',
  production: false,
  api: '',

  mapbox: {
    accessToken: 'pk.eyJ1IjoiY29uZHVzaXQiLCJhIjoiY2oyeG1wcjJuMDExNTJ4cThlemU3NWlsNCJ9.d1o1-L4u4_-aY_uvAn5krQ',
    location: {
      latitude: -23.533773, 
      longitude: -46.625290
    }
  }
};
