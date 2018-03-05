export interface RegisterJobOptions {
  name: string;
  context: {};
  cronTime: string | Date;
  onTick: () => void;
}
