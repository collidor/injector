import { assertEquals, assertThrows } from "jsr:@std/assert";
import { Injector } from "./main.ts";

Deno.test("Injector - should register and get value", () => {
  const injector = new Injector();

  injector.register(Injector, injector);
  assertEquals(injector.get(Injector), injector);

  function a() {
    return 1;
  }

  injector.register(a, a());
  assertEquals(injector.get(a), 1);
});

Deno.test("Injector - should throw if no instance is registered", () => {
  const injector = new Injector();

  assertThrows(
    () => injector.get(Injector),
    Error,
  );
});

Deno.test("Injector - should unregister instance", () => {
  const injector = new Injector();

  injector.register(Injector, injector);
  assertEquals(injector.get(Injector), injector);

  injector.unregister(Injector);
  assertThrows(
    () => injector.get(Injector),
    Error,
  );
});
