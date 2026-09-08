import { describe, expect, it, vi } from "vitest"
import { hostConfig } from "../reconciler/host-config.js"
import type {
  Container,
  DivProps,
  MutationRenderer,
} from "../types/host.js"

function rendererSpy(): MutationRenderer {
  return {
    createElement: vi.fn(),
    destroyElement: vi.fn(() => []),
    appendChild: vi.fn(),
    insertBefore: vi.fn(),
    setStyle: vi.fn(),
    setText: vi.fn(),
    setEventListener: vi.fn(),
    setRoot: vi.fn(),
    setCustomProp: vi.fn(),
    flushMutations: vi.fn(),
  }
}

describe("window chrome props", () => {
  it("forwards native drag and resize regions on divs", () => {
    const renderer = rendererSpy()
    const container: Container = {
      renderer,
      ids: { nextElementId: 0 },
      eventHandlers: new Map(),
      windowKeyEventHandlers: {},
      windowKeyEventId: 0,
    }
    const props: DivProps = {
      windowDragRegion: true,
      windowResizeEdge: "bottomRight",
    }

    const instance = hostConfig.createInstance(
      "div",
      props,
      container,
      { isInsideText: false },
    )
    hostConfig.appendChildToContainer(container, instance)

    expect(renderer.setCustomProp).toHaveBeenCalledWith(
      instance.id,
      "windowDragRegion",
      true,
    )
    expect(renderer.setCustomProp).toHaveBeenCalledWith(
      instance.id,
      "windowResizeEdge",
      "bottomRight",
    )
  })
})
