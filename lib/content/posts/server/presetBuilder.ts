import { Preset, Plugin, PluginTuple } from 'unified'

export class PresetBuilder {
  private plugins: PluginTuple[] = []

  public use<
    PluginParameters extends unknown[] = unknown[],
    Input = Node,
    Output = Input
  >(
    plugin: Plugin<PluginParameters, Input, Output>,
    ...settings: PluginParameters | [boolean]
  ): this {
    this.plugins.push([
      plugin as Plugin<unknown[], unknown, unknown>,
      ...settings
    ])
    return this
  }

  public build(): Preset {
    return {
      plugins: this.plugins
    }
  }
}
