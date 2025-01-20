import React from 'react'

import { useMemo, isValidElement, Children } from 'react'

/**
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Renders a list of items from an array. If the array is empty, renders the
 * `fallback` if provided.
 *
 * @param {Array<T>} each The array of items to render.
 * @param {ReactNode} fallback An optional element to render if the array is empty.
 * @param {(item: T, index: number) => U} children A function that takes an item and its index and returns a React element.
 *
 * @example
 * ```tsx
 * // 🥱 pure jsx
 * {items.length > 0
 *   ? items.map((item, index) => <Item key={index} item={item} />)
 *   : <div>No items</div>
 * }
 *
 * // 🗿 with <For />
 * <For each={items} fallback={<div>No items</div>}>
 *   {(item, index) => <Item key={index} data={item} />}
 * </For>
 * ```
 */
export function For<T, U extends React.ReactNode>(props: {
  each: Array<T> | null | undefined
  fallback?: React.ReactNode | undefined
  children: (item: T, index: number) => U
}): React.ReactElement {
  const items = useMemo(() => {
    return props.each?.map((item) => item) ?? []
  }, [props.each])
  return (
    <React.Fragment>
      {useMemo(() => {
        return items.length > 0
          ? items.map((item, index) => props.children(item, index))
          : props.fallback
      }, [items, props.fallback, props.children])}
    </React.Fragment>
  )
}

/**
 * Conditionally render its children or an optional fallback component.
 *
 * If the `children` prop is a function, it is called with the value of the
 * `when` prop as its argument.
 *
 * Similar to the ternary operator `when ? children : fallback` but ideal for templating JSX.
 *
 * @param {T | undefined | null | false} when The condition to evaluate.
 * @param {ReactNode} fallback An optional element fallback.
 * @param {ReactNode | ((item: T) => ReactNode)} children The element to render if `when` is truthy.
 *
 * @example
 * ```tsx
 * // 🥱 pure jsx
 * {condition ? <True /> : <False />}
 *
 * // 🗿 with <Show />
 * <Show when={condition} fallback={<False />}>
 *   <True />
 * </Show>
 *
 * // 🗿 dynamic rendering with <Show />
 * <Show when={session.user} fallback={<div>Not logged in</div>}>
 *   {(user) => <div>Hello, {user.name}</div>}
 * </Show>
 * ```
 */
export function Show<T>(props: {
  when: T | undefined | null | false
  fallback?: React.ReactNode | undefined
  children: React.ReactNode | ((item: T) => React.ReactNode)
}): React.ReactElement {
  return (
    <React.Fragment>
      {props.when !== undefined && props.when !== null && props.when !== false
        ? typeof props.children === 'function'
          ? props.children(props.when)
          : props.children
        : (props.fallback ?? null)}
    </React.Fragment>
  )
}

/**
 * Selects a content based on condition when inside a <{@link Switch} /> control flow.
 *
 * @param {T | undefined | null | false} when The condition to evaluate.
 * @param {ReactNode | ((item: T) => ReactNode)} children The element to render if `when` is truthy.
 *
 * @example
 * ```tsx
 * <Match when={condition}>
 *   <Content/>
 * </Match>
 * ```
 */
export function Match<T>(props: {
  when: T | undefined | null | false
  children: React.ReactNode | ((item: T) => React.ReactNode)
}): React.ReactElement | null {
  if (props.when === undefined || props.when === null || props.when === false) {
    return null
  }
  return (
    <React.Fragment>
      {typeof props.children === 'function'
        ? props.children(props.when)
        : props.children}
    </React.Fragment>
  )
}

/**
 * Conditionally renders the first <{@link Match} /> child with a truthy `when` prop.
 *
 * If none of the <{@link Match} /> children have a truthy `when` prop, renders the
 * `fallback` prop if it is provided.
 *
 * @param {ReactNode} children The children to evaluate, expected to be <{@link Match} /> elements.
 * @param {ReactNode} fallback An optional element to render if no <{@link Match} /> children have a truthy `when` prop.
 *
 * @example
 * ```tsx
 * // 🥱 pure jsx
 * if (route === "home") {
 *   return <Home />
 * }
 * if (route === "settings") {
 *   return <Settings />
 * }
 * return <div>Not found</div>
 *
 * // 🗿 with <Switch />
 * <Switch fallback={<div>Not found</div>}>
 *   <Match when={route === "home"}>
 *     <Home />
 *   </Match>
 *   <Match when={route === "settings"}>
 *     <Settings />
 *   </Match>
 * </Switch>
 * ```
 */
export function Switch(props: {
  fallback?: React.ReactNode
  children:
    | React.ReactElement<typeof Match>
    | Array<React.ReactElement<typeof Match>>
}): React.ReactElement {
  const match: React.ReactNode | undefined = Children.toArray(
    props.children,
  ).find(
    (child) =>
      isValidElement(child) &&
      child.type === Match &&
      child.props.when !== undefined &&
      child.props.when !== null &&
      child.props.when !== false,
  )
  return (
    <React.Fragment>
      {match && isValidElement(match) ? match : props.fallback}
    </React.Fragment>
  )
}
