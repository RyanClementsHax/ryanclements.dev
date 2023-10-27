import { Preset, Plugin } from 'unified'
import { Node } from 'unist'

export class PresetBuilder {
  #plugins: NonNullable<Preset['plugins']> = []

  public use<
    PluginParameters extends unknown[] = unknown[],
    Input extends Node | string | undefined = Node,
    Output = Input
  >(
    plugin: Plugin<PluginParameters, Input, Output>,
    ...settings: PluginParameters
  ): this {
    this.#plugins.push([
      plugin as Plugin<unknown[], undefined, unknown>,
      ...settings
    ])
    return this
  }

  public build(): Preset {
    return {
      plugins: this.#plugins
    }
  }
}
