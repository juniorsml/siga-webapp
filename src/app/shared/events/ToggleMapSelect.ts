export class ToggleMapSelect {
  public status: boolean = false;
  toggleMapType() {
    this.status = !this.status;
  }
}